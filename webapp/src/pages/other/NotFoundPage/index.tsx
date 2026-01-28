import { ErrorPageComponent } from "../../../components/ErrorPageComponent";

export const NotFoundPage = ({
  title = "Not found",
  message = "This page does not exist",
}: {
  title?: string;
  message?: string;
}) => <ErrorPageComponent title={title} message={message} />;
