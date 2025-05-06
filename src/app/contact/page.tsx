export default function ContactUs() {
  return (
    <div className="p-6 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <p className="text-lg text-center mb-8">
        We'd love to hear from you! If you have any questions or feedback, feel free to reach out to us.
      </p>

      <div className="space-y-6 flex flex-col items-center min-h-screen ">
        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold">Email:</div>
          <div
          >
            samsoghomonyans@gmail.com
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xl font-semibold">Phone:</div>
          <div
          >
            +374 (77) 85-58-44
          </div>
        </div>

      </div>
    </div>
  );
}
