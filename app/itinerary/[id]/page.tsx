import { getUserTripData } from "@/queries";
import Component from "./component";
import { auth } from "@clerk/nextjs";
export default async function Page({ params }: { params: { id: string } }) {
  const user = auth().protect();
  const itin = await getUserTripData(params.id);
  if (!itin) {
    return null;
    // Render a refresh button
  }
  console.log(itin);
  return (
    <>
      <Component data={itin} />
    </>
  );
}
