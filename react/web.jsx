import{useState, useEffect} from 'react';

import './Web.css';

const Web = () => {
    const [activeTab, setActiveTab] = useState('projects');

    const [terminalVisible, setTerminalVisible] = useState(false);

    const projects = [
        {id: 1, title: 'Cyber Nexus', genre: 'FPS/RPG', engine: 'Unreal Engine 5', status: 'In Development' },
    { id: 2, title: 'Stellar Command', genre: '4X Strategy', engine: 'Unity', status: 'Released' },
    { id: 3, title: 'Neon Runner', genre: 'Arcade', engine: 'Godot', status: 'Prototype' },];

    const skills = [
        {name: 'Level Design', level: 75},
        {name: 'Game Design', level: 80},
        {name: 'Programming', level: 90},
        {name: 'Art', level: 85},
        {name: 'Sound Design', level: 75},
        {name: 'UI/UX Design', level: 80},
    ];

    return (
        <div classname = 'web'>
            <MatrixBackground />

            <header className = 'header'>
                <h1 className = "cyber-title"> //Game_Design_portfolio</h1>

                <h2 className = "cyber-subttitle"> Alfredo J Contreras | Entry Level Game Designer </h2>
            </header>
      <nav className="cyber-nav">
        <button 
          className={`nav-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          PROJECTS
        </button>
        <button 
          className={`nav-button ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          SKILLS
        </button>
        <button 
          className={`nav-button ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          DEV_BLOG
        </button>
      </nav>

      <main className="content">
        {activeTab === 'projects' && (
          <div className="project-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="skill-chart">
            {skills.map(skill => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="terminal" onClick={() => setTerminalVisible(!terminalVisible)}>
            <TerminalWindow visible={terminalVisible} />
          </div>
        )}
      </main>

      <footer className="cyber-footer">
        <p>CONNECT: [GITHUB] [ARTSTATION] [LINKEDIN]</p>
        <p>© 2025 ALFREDO J CONTRERAS | ALL CODE PROTECTED</p>
      </footer>    

            
        </div>
    );

};

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="project-header">
      <h3>{project.title}</h3>
      <span className="status-led" data-status={project.status.toLowerCase()}></span>
    </div>
    <div className="project-details">
      <p>GENRE: {project.genre}</p>
      <p>ENGINE: {project.engine}</p>
      <p>STATUS: {project.status}</p>
    </div>
    <button className="cyber-button">VIEW CASE STUDY</button>
  </div>
);

const SkillBar = ({ skill }) => (
  <div className="skill-container">
    <div className="skill-label">{skill.name}</div>
    <div className="skill-bar">
      <div 
        className="skill-progress" 
        style={{ width: `${skill.level}%` }}
        data-level={skill.level}
      ></div>
    </div>
  </div>
);

const MatrixBackground = () => {
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        convas.className ='matrix-canvas';
        document.body.appendChild(canvas);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const drops = Array(Math.floor(canvas.width / 20)).fill(0);

        const draw = () => {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f0';
            ctx.font = '20px monospace';

            drops.forEach((drop,i)=> {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * 20, drop * 20);
                drops[i] = drop > canvas.hight / 20 || Math.random() > 0.95 ? 0 : drop + 1;
            });
    };

    const interval = setInterval(draw, 50);
    return() => {
        clearInterval(interval);
        window.removeEventListener('resize', resize);
    };
    }, []);
    return null;
};

export default Web;