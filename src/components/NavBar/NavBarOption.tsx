import { NavLink } from "react-router-dom";

interface IOptions {
  path: string;
  img: string;
}

function NavBarOption(props: IOptions) {
  return (
    <li>
      <NavLink
        to={props.path}
        className={(isActive) => isActive && "navActive"}
      >
        <img src={props.img} alt="iconOptions" width={15} height={15} />
      </NavLink>
    </li>
  );
}

export default NavBarOption;
