import { ErrorPageComponent } from "../../../components/ErrorPageComponent";
import img404 from "../../../assets/images/404.png";
import css from "./index.module.scss";

export const NotFoundPage = ({
  title = "Not found",
  message = "This page does not exist",
}: {
  title?: string;
  message?: string;
}) => (
  <ErrorPageComponent title={title} message={message}>
    <img src={img404} className={css.image} alt="" width="800" height="600" />
  </ErrorPageComponent>
);
