import Component from "./component";
export default async function Page() {
  const itin = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/itin`,
  ).then((res) => res.json());

  return (
    <>
      <Component data={itin} />
    </>
  );
}
