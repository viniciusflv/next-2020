import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Repos(props) {

  return <div>{props.name}</div>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://localhost:3000/api/repos");
  const repos = await response.json();

  return {
    paths: repos?.map(({ name }) => ({ params: { repo: name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { repo } }) => {
  const response = await Promise.all([
    fetch(`http://localhost:3000/api/repos/${repo}`),
    fetch(`http://localhost:3000/api/repos/${repo}/readme`),
  ]);
  const [repository, readme] = await Promise.all(response.map((res) => res.json()));

  console.log(readme)

  return {
    props: { ...repository, readme },
    revalidate: 10,
  };
};
