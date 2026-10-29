
export default function DevelopersPage() {
  const developers = ["NEIL JHON THOMPSON", "JERRY CABILES", "LEAH MADRELEJOS", "REYSEL JORDAN"];

  const technologies = [
    "React",
    "React Router",
    "Vite",
    "HTML",
    "CSS",
    "JavaScript",
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Meet the Developers</h1>
        <p>The team behind Taskly</p>
      </div>

      <section className="developers-intro">
        <h2>About Taskly</h2>
        <p>
          Taskly is a task management application designed to help
          users organize tasks, manage groups, and track their
          activities in one place.
        </p>
      </section>

      <section className="developers-section">
        <h2>Our Developers</h2>
        <div className="developers-list">
          {developers.map((name) => (
            <div className="developer-card" key={name}>
              <div className="developer-avatar">
                {name.charAt(0)}
              </div>
              <h3>{name}</h3>
              <p>Taskly Developer</p>
            </div>
          ))}
        </div>
      </section>

      <section className="technology-section">
        <h2>Technologies Used</h2>
        <div className="technology-list">
          {technologies.map((technology) => (
            <span className="technology-tag" key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide a simple and user-friendly
          application that helps users manage tasks efficiently
          and stay organized.
        </p>
      </section>
    </div>
  );
}
