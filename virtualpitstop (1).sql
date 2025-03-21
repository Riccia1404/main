-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Mar 21, 2025 alle 13:23
-- Versione del server: 5.7.24
-- Versione PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `virtualpitstop`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `affitto`
--

CREATE TABLE `affitto` (
  `num_contratto` int(7) NOT NULL,
  `da` date DEFAULT NULL,
  `a` date DEFAULT NULL,
  `canone` int(11) NOT NULL,
  `prezzo_totale` int(11) NOT NULL,
  `targa` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `auto`
--

CREATE TABLE `auto` (
  `targa` varchar(7) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `id_categoria` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `categoria`
--

CREATE TABLE `categoria` (
  `ID_categoria` int(7) NOT NULL,
  `nome_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `garage`
--

CREATE TABLE `garage` (
  `cod_garage` int(7) NOT NULL,
  `num_contratto` int(7) NOT NULL,
  `id_tipologia` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `prenota`
--

CREATE TABLE `prenota` (
  `cod_prenotazione` int(7) NOT NULL,
  `cod_garage` int(7) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `tipologia`
--

CREATE TABLE `tipologia` (
  `ID_tipologia` int(11) NOT NULL,
  `nome_tipologia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `ruolo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`email`, `password`, `nome`, `cognome`, `ruolo`) VALUES
('gigio@gmail.com', 'hola', 'Gigio', 'Cami', 'cliente'),
('riccia1404@gmail.com', 'test', 'Alessandro', 'Ricciardelli', 'admin');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `affitto`
--
ALTER TABLE `affitto`
  ADD PRIMARY KEY (`num_contratto`),
  ADD KEY `auto_affitto` (`targa`);

--
-- Indici per le tabelle `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`targa`),
  ADD KEY `utente_auto` (`email`),
  ADD KEY `auto_categoria` (`id_categoria`);

--
-- Indici per le tabelle `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_categoria`);

--
-- Indici per le tabelle `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`cod_garage`),
  ADD KEY `garage_affitto` (`num_contratto`),
  ADD KEY `tipologia_garage` (`id_tipologia`);

--
-- Indici per le tabelle `prenota`
--
ALTER TABLE `prenota`
  ADD PRIMARY KEY (`cod_prenotazione`),
  ADD KEY `cod_garage_p` (`cod_garage`),
  ADD KEY `utente_p` (`email`);

--
-- Indici per le tabelle `tipologia`
--
ALTER TABLE `tipologia`
  ADD PRIMARY KEY (`ID_tipologia`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `affitto`
--
ALTER TABLE `affitto`
  MODIFY `num_contratto` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_categoria` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `garage`
--
ALTER TABLE `garage`
  MODIFY `cod_garage` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `prenota`
--
ALTER TABLE `prenota`
  MODIFY `cod_prenotazione` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `tipologia`
--
ALTER TABLE `tipologia`
  MODIFY `ID_tipologia` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `affitto`
--
ALTER TABLE `affitto`
  ADD CONSTRAINT `auto_affitto` FOREIGN KEY (`targa`) REFERENCES `auto` (`targa`);

--
-- Limiti per la tabella `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `auto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`ID_categoria`),
  ADD CONSTRAINT `utente_auto` FOREIGN KEY (`email`) REFERENCES `utente` (`email`);

--
-- Limiti per la tabella `garage`
--
ALTER TABLE `garage`
  ADD CONSTRAINT `garage_affitto` FOREIGN KEY (`num_contratto`) REFERENCES `affitto` (`num_contratto`),
  ADD CONSTRAINT `tipologia_garage` FOREIGN KEY (`id_tipologia`) REFERENCES `tipologia` (`ID_tipologia`);

--
-- Limiti per la tabella `prenota`
--
ALTER TABLE `prenota`
  ADD CONSTRAINT `cod_garage_p` FOREIGN KEY (`cod_garage`) REFERENCES `garage` (`cod_garage`),
  ADD CONSTRAINT `utente_p` FOREIGN KEY (`email`) REFERENCES `utente` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
