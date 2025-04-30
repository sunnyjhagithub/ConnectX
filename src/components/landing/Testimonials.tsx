
const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "ConnectX paired me with the perfect mentor who helped me navigate my career transition into tech. The personalized guidance and AI-powered job recommendations were game-changers.",
      author: "Emily Chen",
      role: "Software Engineer",
      company: "Former Student",
    },
    {
      quote:
        "As an alumnus, I love being able to give back to my university community. The platform makes it easy to connect with motivated students and share my industry knowledge.",
      author: "Michael Rodriguez",
      role: "Marketing Director",
      company: "Alumni Mentor",
    },
    {
      quote:
        "The resume analyzer gave me actionable insights that helped me land interviews at my dream companies. The mock interview feature with AI feedback was invaluable for my preparation.",
      author: "Jordan Taylor",
      role: "Data Scientist",
      company: "Former Student",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories from Our{" "}
            <span className="bg-gradient-to-br from-connectx-primary to-connectx-tertiary bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Hear from students and alumni who have experienced the power of ConnectX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full"
            >
              <svg
                className="h-8 w-8 text-connectx-primary mb-4 opacity-60"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-600 mb-6 flex-grow">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-1 bg-gray-100 rounded-full">
            <span className="px-4 py-2 text-sm font-medium">
              Trusted by 100+ universities and organizations worldwide
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
