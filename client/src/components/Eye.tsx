import Hide from "/eye-close.png";
import Visible from "/eye-open.png";

export const EyeClose = () => (
  <img
    src={Hide}
    className="absolute right-0 top-9 mr-2"
    width={20}
    alt="eye-close"
  />
);

export const EyeOpen = () => (
  <img
    src={Visible}
    className="absolute right-0 top-9 mr-2"
    width={20}
    alt="eye-open"
  />
);
