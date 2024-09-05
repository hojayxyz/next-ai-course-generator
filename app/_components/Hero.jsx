import Link from 'next/link';

function Hero() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            <strong className="font-extrabold text-primary sm:block">
              {' '}
              AI Course Generator{' '}
            </strong>
            Customize your AI course with ease
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Our AI course generator allows you to create custom courses for your
            students.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/dashboard"
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
