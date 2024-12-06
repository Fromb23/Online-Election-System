#!/usr/bin/python3

def chatbot():
    print("Welcome to the Course Selector Bot!")
    print("Please select one of the following courses:")

    courses = ["Mathematics", "Computing", "Geography", "Arts"]
    while True:
        for i, course in enumerate(courses, start=1):
            print(f"{i}. {course}")
        print("0. Go back")

        try:
            choice = int(input("Enter the number of your choice: "))
            if choice == 0:
                print("Returning to the main menu...")
                continue
            elif 1 <= choice <= len(courses):
                selected_course = courses[choice - 1]
                print(f"You selected: {selected_course}")
                break
            else:
                print("Invalid selection. Please select a number between 1 and 4, or 0 to go back.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    print("\nPlease select your preferred mode of learning:")
    modes = ["Online", "Home Schooling", "Physical Lessons"]
    while True:
        for i, mode in enumerate(modes, start=1):
            print(f"{i}. {mode}")
        print("0. Go back")

        try:
            mode_choice = int(input("Enter the number of your choice: "))
            if mode_choice == 0:
                print("Returning to course selection...")
                chatbot()
                return
            elif 1 <= mode_choice <= len(modes):
                selected_mode = modes[mode_choice - 1]
                print(f"You selected {selected_mode} mode for {selected_course}.")
                break
            else:
                print("Invalid selection. Please select a number between 1 and 3, or 0 to go back.")
        except ValueError:
            print("Invalid input. Please enter a number.")

if __name__ == "__main__":
    chatbot()
