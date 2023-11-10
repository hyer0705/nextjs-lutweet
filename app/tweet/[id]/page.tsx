import DetailPage from "./detail-page";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <DetailPage id={id} />;
}
