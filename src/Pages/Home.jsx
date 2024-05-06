import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [emirates, setEmirates] = useState();
  const [uniqeData, setUniqueData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    var obj = JSON.parse(localStorage.getItem("emirates"));
    console.log(obj);
    if (obj !== null) {
      const data = obj;
      setEmirates(data);
      setUniqueData({
        alpha_two_codes: [...new Set(data.map((x) => x.alpha_two_code))],
        names: [...new Set(data.map((x) => x.name))],
        countries: [...new Set(data.map((x) => x.country))],
        states: [...new Set(data.map((x) => x["state-province"]))],
      });
      return;
    }
    return async () => {
      try {
        const response = await fetch(
          "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
        );
        const data = await response.json();
        setEmirates(data);
        setUniqueData({
          alpha_two_codes: [...new Set(data.map((x) => x.alpha_two_code))],
          names: [...new Set(data.map((x) => x.alpha_two_code))],
          countries: [...new Set(data.map((x) => x.alpha_two_code))],
          states: [...new Set(data.map((x) => x["state-province"]))],
        });
        console.log(data);
        localStorage.setItem("emirates", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const handleSearch = () => {
    var data = JSON.parse(localStorage.getItem("emirates"));
    if (data !== null) {
      var result = data.filter((x) => x.name.includes(searchText));
      setEmirates(result);
    }
  };

  const handleSort = (field) => {
    var data = [...emirates];
    if (sort === "asc") {
      data?.sort((a, b) => {
        const A = a[field]?.toLowerCase();
        const B = b[field]?.toLowerCase();
        if (A < B) {
          return -1;
        }
        if (A > B) {
          return 1;
        }
        return 0;
      });
    } else {
      data
        ?.sort((a, b) => {
          const A = a[field]?.toLowerCase();
          const B = b[field]?.toLowerCase();
          if (A < B) {
            return -1;
          }
          if (A > B) {
            return 1;
          }
          return 0;
        })
        .reverse();
    }
    setSort(sort === "asc" ? "desc" : "asc");
    setEmirates(data);
  };

  const handleSelectChange = (field, value) => {
    var data = JSON.parse(localStorage.getItem("emirates"));
    if (data !== null) {
      var result = data.filter((x) => x[field].includes(value));
      setEmirates(result);
    }
  };

  const handleDelete = (name) => {
    var result = emirates.filter((x) => x.name !== name);
    setEmirates(result);
  };

  return (
    <>
      <div className="main">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <table>
          <tr>
            <th>
              <span
                onClick={() => {
                  handleSort("alpha_two_code");
                }}
              >
                Code
              </span>
              <br />
              {
                <select
                  onChange={(e) =>
                    handleSelectChange("alpha_two_codes", e.target.value)
                  }
                >
                  <option></option>
                  {uniqeData?.alpha_two_codes?.map((x) => {
                    return <option key={x}>{x}</option>;
                  })}
                </select>
              }
            </th>
            <th>
              <span
                onClick={() => {
                  handleSort("country");
                }}
              >
                Country
              </span>
              <br />
              {
                <select
                  onChange={(e) =>
                    handleSelectChange("country", e.target.value)
                  }
                >
                  {uniqeData?.countries?.map((x) => {
                    return <option key={x}>{x}</option>;
                  })}
                </select>
              }
            </th>
            <th>
              <span
                onClick={() => {
                  handleSort("name");
                }}
              >
                Name
              </span>
              <br />
              {
                <select
                  onChange={(e) => handleSelectChange("name", e.target.value)}
                >
                  {uniqeData?.names?.map((x) => {
                    return <option key={x}>{x}</option>;
                  })}
                </select>
              }
            </th>
            <th>
              <span
                onClick={() => {
                  handleSort("state-province");
                }}
              >
                State/Province
              </span>
              <br />
              {
                <select
                  onChange={(e) =>
                    handleSelectChange("state-province", e.target.value)
                  }
                >
                  {uniqeData?.states?.map((x) => {
                    return <option key={x}>{x}</option>;
                  })}
                </select>
              }
            </th>
            <th>Action</th>
          </tr>

          {emirates?.map((x) => {
            return (
              <tr key={x.alpha_two_code}>
                <td>{x.alpha_two_code}</td>
                <td>{x.country}</td>
                <td>
                  <Link to="/details" state={x}>
                    {x.name}
                  </Link>
                </td>
                <td>{x["state-province"]}</td>
                <td>
                  <button onClick={() => handleDelete(x.name)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Home;
