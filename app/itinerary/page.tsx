import Component from "./component";
export default async function Page() {
  const itin = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/itin`, {
    cache: "no-store",
  }).then((res) => res.json());

  return (
    <>
      <Component data={itin} />
    </>
  );
}
