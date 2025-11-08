class Command:
    def execute(self, char):
        pass

class Print(Command):
    def execute(self, char, count):
        print("|" + "_" * (count-1) + char)

class Cek:
    def __init__(self):
        self.commands = []

    def add_command(self, command):
        self.commands.insert(0, command)  

    def run_commands(self, input_str):
        reversed_input = input_str[::-1]  
        for i, char in enumerate(reversed_input, start=1):
            for command in self.commands:
                command.execute(char, i)


command = Print()


invoker = Cek()
invoker.add_command(command)


user_input = input("Masukkan kata: ")


invoker.run_commands(user_input)
