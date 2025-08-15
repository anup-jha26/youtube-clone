import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Watch from "./Pages/Watch";
import Channel from "./Pages/Channel";
import Playlist from "./Pages/Playlist";
import Search from "./Pages/Search";

function App() {
  const [filter, setFilter] = useState("home");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <BrowserRouter>
      <div
        className="offcanvas offcanvas-start"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <Sidebar filter={filter} setFilter={setFilter} setCategoryId={setCategoryId} />
      </div>

      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home filter={filter} categoryId={categoryId} />} />
        <Route path="/watch/:videoId/:channelId" element={<Watch />} />
        <Route path="/search" element={<Search setSearch={setSearch} />} />
        <Route path="/channel/:channelId" element={<Channel />} />
        <Route path="/playlist/:channelId/:playlistId" element={<Playlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;