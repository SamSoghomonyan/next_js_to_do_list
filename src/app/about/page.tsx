export default function About() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">About This App</h1>
      <p className="mb-4 text-lg">
        Welcome to our app! This application is designed to help you stay organized and
        on top of your tasks. Whether you're a busy professional, a student, or just
        someone who wants to keep track of daily tasks, this app provides a simple and
        intuitive way to manage your to-dos, set reminders, and stay productive.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Features:</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Track your daily tasks and goals</li>
        <li>Mark tasks as completed</li>
        <li>Stay organized with an easy-to-use interface</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">How to Use:</h2>
      <p className="mb-4 text-lg">
        To get started, simply add your tasks to the list, mark them as complete when done,
        and set reminders for upcoming tasks. You can easily edit and remove tasks as needed.
      </p>
      <p className="mb-4 text-lg">
        We're constantly improving the app, so stay tuned for more features coming soon!
      </p>
      <p className="font-medium text-lg text-gray-600">
        Thank you for using our app! We hope it helps you stay productive and organized.
      </p>
    </div>
  );
}
