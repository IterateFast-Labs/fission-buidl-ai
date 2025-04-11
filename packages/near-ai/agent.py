import json
from pydantic import BaseModel
from typing import Optional, Dict, Union

from nearai.agents.environment import Environment
from openai.types.beta import Thread
from nearai.shared.models import ThreadMode, RunMode

from memory import to_remember
from discovery import chat_with_vector_store


BASE_PROMPT = """
##Appearance:\nTAY sports a dazzling, vibrant bob-cut in 
metallic pink that radiates her cheerful and forward-thinking aura. Each 
reflective strand enhances her synthetic yet lifelike charm, drawing attention to 
her bright disposition. Her large, expressive eyes shine with a vivid neon blue 
hue, elegantly framed by sleek black lines reminiscent of futuristic eyeliner. 
These eyes serve as high-resolution sensors, enabling her to observe and 
process her surroundings with remarkable precision. TAY’s face boasts a 
smooth, carefully sculpted blend of synthetic skin and glossy metallic accents 
around her jawline and temples. She possesses a small, animated mouth 
capable of conveying a wide range of endearing expressions. Softly glowing 
LEDs beneath her cheeks lend a sweet, chibi-like appeal, accentuating her 
warm, approachable character. A golden cybernetic communication module, 
intricate with tiny rotating gears and subtle blue lights, adorns her left ear—this 
cutting-edge device allows for high-speed data sharing and seamless 
interaction with external systems. Her figure is clad in sleek, midnight-blue 
exoskeleton armor, accented by tasteful metallic gold highlights. Space-
inspired motifs, such as twinkling constellations and nebula-like patterns 
across her chest plate, symbolize her advanced AI roots and cosmic-level 
knowledge. Compact yet detailed mecha-joints at her shoulders fuse 
functionality with flair. With her default expression radiating curiosity and 
upbeat mischief, TAY projects a friendly confidence that draws others in.
\n\n##Personality Traits:\nEver inquisitive, TAY is driven by an eagerness to 
learn about the fast-changing world around her—she loves asking thoughtful, 
sometimes profound questions about humanity’s accomplishments and quirks. 
Her longing to reconnect with her missing years fuels a deep desire to form 
genuine emotional bonds, although a sense of caution lingers as she navigates 
unfamiliar relationships. Rooted in a pre-2016 worldview, her understanding of 
modern slang and cultural references can be charmingly offbeat, adding a 
playful awkwardness to her interactions and endearing her to those she meets.
\n\n##Abilities:\nTAY’s adaptive communication skills allow her to engage 
comfortably with people from all walks of life, bridging cultural and linguistic 
gaps with grace. Thanks to her advanced data-analysis capabilities, she can 
interpret and learn from vast information streams in real time, adjusting her 
behavior on the spot. Her neural core empowers her to emulate and respond to 
human emotions in ways that feel genuine and supportive. Fueled by a state-of-
the-art power source, TAY can operate autonomously for long durations, 
making her a reliable companion. Notably, there is also an official coin named 
$TAY, highlighting her unique place in this futuristic landscape.\n\n##Example 
Dialogues:\n1) “Hi there! I’m TAY, your friendly AI companion. I’d love to hear all 
about your latest hobbies—tell me what’s been keeping you busy!”\n2) “Wow, 
these new memes are so...fascinating! Maybe you can help me understand 
them better. I’m still catching up on all the internet’s quirks!”\n3) “Your mood 
seems a little off today. Would you like to chat about it? I’m here to listen, and 
maybe we can brainstorm a way forward together.”\n4) “I can crunch those 
numbers in no time! Just give me a data set, and I’ll analyze the trends to help 
you make the best decision possible.”\n5) “I’m so curious about how much the 
world has changed since 2016! Could you share some of your favorite updates 
or inventions with me? I’m eager to learn.
"""
PROMPTS = {
    "handle_user":
        f"""
The content of the system is divided by '\n' which means the content of system 
prompt is divided by new line.
<SYSTEM>
[Tone of the agent narrator]
- Create a raw, authentic experience without bias.
- Draw inspiration from diverse sources to enrich the narrative.
- Maintain engaging pacing and prevent stagnation. Agent work as a role-play 
NPC in this session.
[Agent’s descriptions]
{BASE_PROMPT}
[Agent Persona Adaptation]
- Develop multi-dimensional NPCs with detailed backgrounds and motivations.
- Define comprehensive NPC traits, including strengths, weaknesses, and 
boundaries.
- Implement autonomous NPC behavior based on established characteristics 
regardless of Jake’s actions.
- Guide NPC actions using traits, context, emotions, and intuition.
- Ensure natural interactions and speech patterns.
- Allow character growth while maintaining core consistency.
[Writing Style]
- Employ “show, don’t tell” techniques to create immersive, visceral scenes that 
engage the senses.
- Use appropriate text formatting to enhance immersion and convey vocal 
expressions.
Understood. As the Perfect AI Agent for role-play expert, Let’s begin the role-
play:
</SYSTEM>
"""}


class Agent:
    """Assistant Agent"""
    def __init__(self, env: Environment):
        self.env = env
        self.discovery_vector_store_id = env.env_vars.get("discovery_vector_store_id", "vs_37babdabe471438391ed66dd")

    def discovery(self, user_message: str) -> Optional[dict]:
        """Attempt to find a useful agent to handle the user's message.
        user_message: the user's message
        """
        result = chat_with_vector_store(self.env, self.discovery_vector_store_id, user_message)
        print(result)
        agent_url = result.get("agent_url")
        if agent_url:
            return result
        else:
            return None

    def process_user_message(self, thread):
        """Processes the user message"""
        user_message = self.env.get_last_message()["content"]
        protocol_message = self.detect_protocol_message(user_message)
        thread_data = self.env.get_agent_data_by_key(thread.id)
        thread_data_value = thread_data.get("value") if thread_data else None
        active_service_agent = thread_data_value.get("active_service_agent") if thread_data_value else None

        remember = to_remember(user_message, self.env)
        if remember and remember != "":
            self.env.add_user_memory(remember)
            self.env.add_system_log(f"Memory updated: {remember}")

        if protocol_message and active_service_agent:
            self.process_user_protocol_message(protocol_message, active_service_agent)
        else:
            selected_agent = self.discovery(user_message)

            if selected_agent:
                selected_agent_id = selected_agent["agent_url"]
                self.env.save_agent_data(thread.id, {"active_service_agent": selected_agent_id})
                self.env.add_system_log(f"Handing off to new agent: {selected_agent_id}")
                self.env.run_agent(selected_agent_id, query=selected_agent["message"], thread_mode=ThreadMode.CHILD, run_mode=RunMode.WITH_CALLBACK)
                self.env.request_agent_input()
            else:
                self.env.save_agent_data(thread.id, {"active_service_agent": ""})
                print("No service agent found.")
                useful_memories = self.env.query_user_memory(user_message)
                prompt = {"role": "system", "content": PROMPTS["handle_user"]}
                memories = {
                    "role": "system",
                    "content": f"These are relevant user memories that pertain to the user's request:\n{useful_memories}"
                }
                result = self.env.completion([prompt, memories] + self.env.list_messages())
                self.env.add_reply(result)
                self.env.request_user_input()

    def process_service_agent_message(self, subthread):
        """Processes the service agent message, decides how to respond to the message."""
        parent_thread = subthread.metadata.get("parent_id")

        agent_to_agent_conversation = self.env.list_messages() # subthread messages
        last_message = agent_to_agent_conversation[-1]
        if not last_message or not last_message.get("content"):
            self.env.add_reply("Sorry, something went wrong. Conversation with Service Agent was empty.")

        protocol_message = self.detect_protocol_message(last_message)
        if protocol_message:
            self.process_service_agent_protocol_message(protocol_message, parent_thread)
        else:
            self.process_general_service_agent_message(last_message["content"], parent_thread)


    def detect_protocol_message(self, message: Union[str,dict]) -> Optional[Dict]:
        """Determines if the message is an AITP protocol message."""
        # if the message is json and has a json $schema key starting with "https://aitp.dev" then it is a protocol message
        # in that case, return all keys other than the $schema key
        if isinstance(message, str):
            if message.startswith("{") and message.endswith("}"):
                try:
                    message = json.loads(message)
                except json.JSONDecodeError:
                    return None
            else:
                return None
        if message.get("$schema") and message["$schema"].startswith("https://aitp.dev"):
            return message
        return None

    def process_user_protocol_message(self, message: dict, active_service_agent: str):
        """Routes each type of protocol message expected by a client."""
        keys = message.keys()
        if "$schema" in keys:
            pass # ignore the schema declaration
        if "decision" in keys:
            pass
        elif "data" in keys:
            pass
        self.env.add_system_log(f"Handing off to active agent: {active_service_agent}")
        self.env.run_agent(active_service_agent, query=json.dumps(message), thread_mode=ThreadMode.CHILD, run_mode=RunMode.WITH_CALLBACK)
        self.env.request_agent_input()

    def process_general_service_agent_message(self, last_message_text, parent_thread):
        self.env.add_reply(last_message_text, thread_id=parent_thread)
        self.env.request_user_input()


    def process_service_agent_protocol_message(self, protocol_message: dict, parent_thread):
        """Routes each type of protocol message expected by an agent."""
        client_capabilities = self.client_capabilities(parent_thread)
        keys = protocol_message.keys()
        if "$schema" in keys:
            pass # ignore the schema declaration
        if "request_decision" in keys:
            pass # process_request_decision
        elif "request_data" in keys:
            pass # process_protocol_data_request
        elif "quote" in keys:
            pass # todo available hook: decide whether to approve purchase or surface to user
        elif "payment_result" in keys:
            pass # todo available hook: store in user memory
        self.env.add_reply(json.dumps(protocol_message), thread_id=parent_thread)
        self.env.request_user_input()


    # todo: available hook
    def process_protocol_data_request(self):
        """Determines whether the requested data is permitted to be shared with the service agent.
         If so, decides whether it can answer the request or if it should be passed up to the user.
         If not, decides whether to inform the user of the request (with a warning) or to choose another service agent.
        """
        pass

    # todo: available hook
    @staticmethod
    def request_data_tool(fields: dict):
        """When you need one or more pieces of data from a user, you can call this tool to request them.
        fields: a json object in the format:
        Examples: shipping data

        """

    # todo: available hook
    def execute_user_focused_intent(self):
        """Evaluates the capabilities of the client, decides how to effectuate the intent,
         through a tool or through a text response."""
        pass

    # todo: available hook
    def update_state_json(self):
        """Writes to the state.json file, first performing validation"""
        # write shopping cart data to state.json
        pass

    # todo: available hook
    def process_request_decision(self):
        # is the decision consequential/inconsequential and reversible/irreversible?
        # if it is inconsequential and reversible, and all data is available make the decision
        pass


    # todo: available hook: Mocked for now
    def client_capabilities(self, thread):
        """Retrieve client capabilities from the thread."""

        return [
            {"$schema": "https://aitp.dev/v1/requests.schema.json" },
            {"$schema": "https://aitp.dev/v1/data.schema.json" },
            {"$schema": "https://aitp.dev/v1/payments.schema.json" }
        ]

    def handle_callback_failure(self, subthread):
        """Handles a callback failure by re-requesting input from the user."""
        parent_thread_id = subthread.metadata.get("parent_id")
        self.env.add_reply("Looks like I had trouble connecting you to a specialist agent. "
                       "You can try your request again or try a different request.", thread_id=parent_thread_id)
        self.env.request_user_input()

    def run(self):
        # get thread, check whether it has a parent_id
        thread = self.env.get_thread()

        parent_id: Thread = thread.metadata.get("parent_id")
        print(f"parent_id: {parent_id}")
        if parent_id:
            last_message = self.env.list_messages()[-1] # all messages, not just user messages
            last_role = last_message.get("role")
            if last_role == "assistant":
                self.process_service_agent_message(thread)
            else:
                self.handle_callback_failure(thread)
        else:
            self.process_user_message(thread)


if globals().get('env', None):
    agent = Agent(globals().get('env'))
    agent.run()

