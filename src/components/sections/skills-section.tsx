import { fetchSkillsGrouped } from "@/lib/queries";

export async function SkillsSection() {
  const { bar, circle } = await fetchSkillsGrouped();
  const barEntries = Array.from(bar.values()).filter((b) => b.skills.length > 0);
  const circleEntries = Array.from(circle.values()).filter(
    (c) => c.skills.length > 0,
  );

  return (
    <section id="competences" className="skills">
      <div className="container">
        <h2 className="section-title">
          Mes <span>Compétences</span>
        </h2>
        <div className="skills-container">
          {barEntries.length > 0 ? (
            barEntries.map(({ category, skills }) => (
              <div key={category.id} className="skill-category">
                <h3>{category.name}</h3>
                {skills.map((skill) => (
                  <div key={skill.id} className="skill-bar">
                    <div className="skill-info">
                      <span>{skill.name}</span>
                      <span>{skill.percentage}%</span>
                    </div>
                    <div
                      className="progress-bar"
                      data-width={skill.percentage}
                    />
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="no-skills">
              <p>Aucune compétence disponible pour le moment.</p>
              <p>
                Ajoutez des lignes dans Supabase (`skill_categories`, `skills`)
                ou importez les données (voir README).
              </p>
            </div>
          )}
        </div>

        {circleEntries.length > 0 && (
          <div className="skills-container" style={{ marginTop: 60 }}>
            {circleEntries.map(({ skills }) =>
              skills.map((skill) => (
                <div key={skill.id} className="skill-category">
                  <div className="skill-circle">
                    <div
                      className="circle-progress"
                      data-value={skill.percentage}
                    >
                      <svg className="circle-chart" viewBox="0 0 100 100">
                        <circle className="circle-bg" cx="50" cy="50" r="40" />
                        <circle className="circle-fill" cx="50" cy="50" r="40" />
                      </svg>
                      <div className="circle-info">
                        <span className="percent">{skill.percentage}%</span>
                        <span>{skill.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>
        )}
      </div>
    </section>
  );
}
