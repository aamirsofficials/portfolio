const resumeUrl = "https://drive.google.com/file/d/1f4kS8gBHi4XI49I4a6JcOSFGbW56pOrZ/view?usp=sharing";

export function ResumeLink() {
  return <a className="resume-link" href={resumeUrl} target="_blank" rel="noreferrer">View Resume</a>;
}
