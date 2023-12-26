import { Typography } from "../ui/typography";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <Typography variant="h2">Mission</Typography>
          <Typography variant="p">
            Asking a possible customer if they would use a product/service you
            are selling is dangerous. Asking direct questions forces your users
            to respond to your answers in a way that don't hurt you.
            Forms/Surveys are guilty of it, they create bias. "The Mom Test" is
            a book by Bob Fitzpatrick for Entrepreneurs on how to do effective
            "User Interviews".
            <br />
            <br /> The book lays good groundwork on how to do user interviews,
            but conducting interviews are tough and time consuming. We still
            advise users to do interviews in person. But oftentimes its not
            possible, as people are busy and finding common time is difficult.
            Survey/Forms have an advantage since they are asynchronous. The
            product tries to have best of both world, unstructured deep dives
            and asynchronous interviews.
          </Typography>
        </div>
      </div>
    </section>
  );
}
