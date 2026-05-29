import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apartments } from "../data/mockData";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("All");
  const [sortBy, setSortBy] = useState("highest");

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const neighbourhoods = ["All", ...new Set(apartments.map((apt) => apt.neighbourhood))];

  const filteredApartments = useMemo(() => {
    let result = apartments.filter((apt) => {
      const matchesSearch =
        apt.name.toLowerCase().includes(search.toLowerCase()) ||
        apt.address.toLowerCase().includes(search.toLowerCase()) ||
        apt.neighbourhood.toLowerCase().includes(search.toLowerCase());

      const matchesNeighbourhood =
        neighbourhood === "All" || apt.neighbourhood === neighbourhood;

      return matchesSearch && matchesNeighbourhood;
    });

    if (sortBy === "highest") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "lowest") {
      result = [...result].sort((a, b) => a.rating - b.rating);
    }

    if (sortBy === "reviews") {
      result = [...result].sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [search, neighbourhood, sortBy]);

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="logo">TenantTrails</div>

        <input
          className="nav-search"
          type="text"
          placeholder="Search apartments by address or neighbourhood..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="user-area">
          <div className="avatar">{user?.name?.charAt(0) || "A"}</div>
          <span>{user?.name || "Alex"}</span>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <h1>Apartments in Halifax</h1>
        <p className="dashboard-subtitle">
          Honest reviews from real tenants. Read before you rent.
        </p>

        <div className="stats-row">
          <span>5 apartments</span>
          <span>13 reviews</span>
          <span>4 neighbourhoods</span>
        </div>

        <div className="filters-row">
          <select
            value={neighbourhood}
            onChange={(event) => setNeighbourhood(event.target.value)}
          >
            {neighbourhoods.map((area) => (
              <option key={area} value={area}>
                {area === "All" ? "All Neighbourhoods" : area}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>

        <section className="apartment-grid">
          {filteredApartments.map((apt) => (
            <article className="apartment-card" key={apt.id}>
              <div className="apartment-image">
                <span className="rating">⭐ {apt.rating}</span>
              </div>

              <div className="apartment-body">
                <h2>{apt.name}</h2>
                <p className="address">
                  📍 {apt.address} · {apt.neighbourhood}
                </p>

                <div className="tag-row">
                  {apt.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="card-footer">
                  <small>{apt.reviews} review{apt.reviews > 1 ? "s" : ""}</small>
                  <small>★★★★★</small>
                </div>
              </div>
            </article>
          ))}
        </section>

        {filteredApartments.length === 0 && (
          <p className="empty-message">No apartments match your search.</p>
        )}
      </main>
    </div>
  );
}

export default Dashboard;