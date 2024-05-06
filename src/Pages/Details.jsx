import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  console.log(location);
  const data = location.state;

  return (
    <table>
      <tr>
        <th>Code</th>
        <th>Country</th>
        <th>Name</th>
        <th>State/Province</th>
      </tr>

      <tr>
        <td>{data.alpha_two_code}</td>
        <td>{data.country}</td>
        <td>
          {data.name}
        </td>
        <td>{data["state-province"]}</td>        
      </tr>
    </table>
  );
};

export default Details;
