interface DownloadProps {
  /** Store badge image. */
  logo: string;
  alt: string;
  /** Small caption, e.g. 'Download on the'. */
  top: string;
  /** Store name, e.g. 'App Store'. */
  down: string;
  /** 'dark' when the pill sits on a dark surface (footer). */
  tone?: "light" | "dark";
}

const Download = ({ logo, alt, top, down, tone = "light" }: DownloadProps) => (
  <div className={`download ${tone === "dark" ? "download--dark" : ""}`}>
    <img className="download__logo" src={logo} alt={alt} />
    <span className="download__text">
      <span className="download__caption">{top}</span>
      <span className="download__store">{down}</span>
    </span>
  </div>
);

export default Download;
