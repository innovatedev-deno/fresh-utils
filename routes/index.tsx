import { PageProps } from "$fresh/server.ts";
import MainTemplate from "fresh-utils/components/template/MainTemplate.tsx";

export default function(props: PageProps) {
  return <MainTemplate props={props}>
    This is the main content
  </MainTemplate>
}
