import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Custom styles for specific design elements

const Navbar = () => {
  return (
    <nav className="navbar-custom navbar bg-dark">
      <div className="navbar-inner">
        <div className="navbar-list">
          <ul className="navbar-nav flex-column">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownTech" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Laptop, Tablete, Telefoane
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownTech">
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Laptopuri')}`}>Laptopuri</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Accesorii laptop')}`}>Accesorii laptop</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Telefoane mobile')}`}>Telefoane mobile</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Accesorii telefoane mobile')}`}>Accesorii telefoane mobile</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Tablete')}`}>Tablete</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Accesorii tablete')}`}>Accesorii tablete</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Wearables si Gadgets')}`}>Wearables si Gadgets</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownPC" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                PC & Software
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownPC">
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Desktop PC')}`}>Desktop PC</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Monitoare')}`}>Monitoare</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Placi Video')}`}>Placi Video</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Placi de baza')}`}>Placi de baza</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Procesoare')}`}>Procesoare</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Solid-State-Drive (SSD)')}`}>Solid-State-Drive (SSD)</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Hard Disk-uri')}`}>Hard Disk-uri</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Memorii')}`}>Memorii</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Carcase')}`}>Carcase</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Coolere procesor')}`}>Coolere procesor</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Placi de sunet')}`}>Placi de sunet</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Surse PC')}`}>Surse PC</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Sisteme de operare')}`}>Sisteme de operare</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Office & Aplicatii desktop')}`}>Office & Aplicatii desktop</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownPeripherals" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Periferice PC
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownPeripherals">
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Mouse')}`}>Mouse</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Tastaturi')}`}>Tastaturi</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Hard Disk externe')}`}>Hard Disk externe</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('SSD-uri externe')}`}>SSD-uri externe</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Boxe PC')}`}>Boxe PC</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Casti')}`}>Casti</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Microfoane')}`}>Microfoane</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Memorii USB')}`}>Memorii USB</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Imprimante')}`}>Imprimante</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Cartuse, tonere si consumabile')}`}>Cartuse, tonere si consumabile</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Routere wireless')}`}>Routere wireless</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Camere de supraveghere')}`}>Camere de supraveghere</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Camere Web')}`}>Camere Web</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownAV" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                TV, Sisteme Audio-Video
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownAV">
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Televizoare si accesorii')}`}>Televizoare si accesorii</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Drone si accesorii')}`}>Drone si accesorii</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Camere video si accesorii')}`}>Camere video si accesorii</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Aparate foto si accesorii')}`}>Aparate foto si accesorii</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Videoproiectoare si accesorii')}`}>Videoproiectoare si accesorii</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownHomeAppliances" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Electrocasnice, Climatizare
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownHomeAppliances">
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Frigidere si derivate')}`}>Frigidere si derivate</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Masini de spalat rufe')}`}>Masini de spalat rufe</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Aragazuri, hote si cuptoare')}`}>Aragazuri, hote si cuptoare</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Masini de spalat vase')}`}>Masini de spalat vase</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Electrocasnice bucatarie')}`}>Electrocasnice bucatarie</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Espressoare si cafetiere')}`}>Espressoare si cafetiere</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Aspiratoare si fiare de calcat')}`}>Aspiratoare si fiare de calcat</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Climatizare')}`}>Climatizare</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Purificatoare de aer')}`}>Purificatoare de aer</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Aparate de aer conditionat')}`}>Aparate de aer conditionat</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownGaming" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Gaming, Carti, Birotica
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownGaming">
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Console Gaming')}`}>Console Gaming</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Accesorii Gaming')}`}>Accesorii Gaming</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Jocuri Console & PC')}`}>Jocuri Console & PC</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Carti')}`}>Carti</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Filme')}`}>Filme</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Muzica')}`}>Muzica</Link></li>
                <li><Link className="dropdown-item" to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Consumabile si accesorii birou')}`}>Consumabile si accesorii birou</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
