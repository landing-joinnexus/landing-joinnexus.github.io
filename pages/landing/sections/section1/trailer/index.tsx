import Styles from "./index.module.css";

export const Trailer = () => {
  return (
    <section className="column">
      <div className={`${Styles.trailer}`}>
        <iframe
          src="https://www.youtube.com/embed/oEZz9SgrW_Y?controls=0"
          title="Nexus"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}></iframe>
      </div>
    </section>
  );
};
