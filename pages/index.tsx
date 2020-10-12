import { GetStaticProps } from "next";
import Link from "next/link";

export default function Home({ name, avatar_url, login, repos }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#555",
        fontFamily: "sans-serif",
      }}
    >
      <figure style={{ width: 200 }}>
        <img
          style={{ borderRadius: 500, width: "100%", height: "100%" }}
          src={avatar_url}
          alt={name}
        />
      </figure>
      <header
        style={{
          display: "flex",
          flexDirection: "column",
          color: "#555",
          fontFamily: "sans-serif",
        }}
      >
        <h1 style={{margin: 0}}>{name}</h1>
        <h2 style={{margin: 0}}>{login}</h2>
        {repos?.map(({ name }) => (
          <Link key={name} href={name}>
            {name}
          </Link>
        ))}
      </header>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await Promise.all([
    fetch("http://localhost:3000/api/me"),
    fetch("http://localhost:3000/api/repos"),
  ]);
  const [user, repos] = await Promise.all(response.map((res) => res.json()));

  return {
    props: { ...user, repos },
    revalidate: 10,
  };
};
