-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Creato il: Mag 02, 2025 alle 13:27
-- Versione del server: 8.4.4
-- Versione PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trivia`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `domande`
--

CREATE TABLE `domande` (
  `id_domanda` int NOT NULL,
  `descrizione` varchar(500) NOT NULL,
  `categoria` enum('Storia','Geografia','Scienze','Sport','Letteratura Italiana') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `domande`
--

INSERT INTO `domande` (`id_domanda`, `descrizione`, `categoria`) VALUES
(1, 'Chi fu il primo presidente degli Stati Uniti?', 'Storia'),
(2, 'In quale anno cadde il Muro di Berlino?', 'Storia'),
(3, 'Chi scoprì l\'America?', 'Storia'),
(4, 'Quale imperatore costruì il Colosseo?', 'Storia'),
(5, 'In quale anno finì la Prima Guerra Mondiale?', 'Storia'),
(6, 'Chi scrisse il \"Manifesto del Partito Comunista\"?', 'Storia'),
(7, 'Quale civiltà costruì le Piramidi?', 'Storia'),
(8, 'Chi fu il leader della Rivoluzione Russa?', 'Storia'),
(9, 'In quale secolo visse Leonardo da Vinci?', 'Storia'),
(10, 'Quale evento storico viene ricordato il 14 luglio in Francia?', 'Storia'),
(11, 'Qual è il fiume più lungo del mondo?', 'Geografia'),
(12, 'In quale paese si trova il deserto del Sahara?', 'Geografia'),
(13, 'Qual è la capitale del Canada?', 'Geografia'),
(14, 'Quale montagna è la più alta del mondo?', 'Geografia'),
(15, 'In quale continente si trova il Madagascar?', 'Geografia'),
(16, 'Quale paese è chiamato \"Terra del Sol Levante\"?', 'Geografia'),
(17, 'Quale città è divisa in due dal fiume Moscova?', 'Geografia'),
(18, 'Quale oceano è il più vasto?', 'Geografia'),
(19, 'In quale paese si trova la Grande Barriera Corallina?', 'Geografia'),
(20, 'Quale paese confina con il maggior numero di nazioni?', 'Geografia'),
(21, 'Quale elemento ha simbolo \"O\" nella tavola periodica?', 'Scienze'),
(22, 'Quale pianeta è noto come il \"Pianeta Rosso\"?', 'Scienze'),
(23, 'Quale organo produce insulina nel corpo umano?', 'Scienze'),
(24, 'Quale gas è essenziale per la fotosintesi?', 'Scienze'),
(25, 'Quanti cromosomi ha una cellula umana sana?', 'Scienze'),
(26, 'Quale scienziato formulò la teoria della relatività?', 'Scienze'),
(27, 'Quale unità misura la corrente elettrica?', 'Scienze'),
(28, 'Quale processo converte glucosio in energia?', 'Scienze'),
(29, 'Quale elemento chimico ha numero atomico 1?', 'Scienze'),
(30, 'Quale parte della cellula contiene il DNA?', 'Scienze'),
(31, 'Quale nuotatore ha vinto più medaglie olimpiche?', 'Sport'),
(32, 'In quale sport si usa la mazza da baseball?', 'Sport'),
(33, 'Quanti giocatori ci sono in una squadra di rugby?', 'Sport'),
(34, 'Quale paese ha vinto più Mondiali di calcio?', 'Sport'),
(35, 'Quale atleta è soprannominato \"The Flash\"?', 'Sport'),
(36, 'In quale anno si tennero le Olimpiadi di Roma?', 'Sport'),
(37, 'Quale sport pratica Novak Djokovic?', 'Sport'),
(38, 'Quale nazione ha inventato il cricket?', 'Sport'),
(39, 'Quanti set si giocano in una partita di tennis?', 'Sport'),
(40, 'Quale città ha ospitato le Olimpiadi del 2012?', 'Sport'),
(41, 'Chi scrisse \"I Promessi Sposi\"?', 'Letteratura Italiana'),
(42, 'A quale movimento appartiene Gabriele D\'Annunzio?', 'Letteratura Italiana'),
(43, 'Quale poeta è autore della \"Divina Commedia\"?', 'Letteratura Italiana'),
(44, 'In quale città è ambientato \"Il Gattopardo\"?', 'Letteratura Italiana'),
(45, 'Chi scrisse \"La coscienza di Zeno\"?', 'Letteratura Italiana'),
(46, 'Quale opera è di Giovanni Boccaccio?', 'Letteratura Italiana'),
(47, 'Chi è l\'autore de \"Il Principe\"?', 'Letteratura Italiana'),
(48, 'Quale romanzo è stato scritto da Elsa Morante?', 'Letteratura Italiana'),
(49, 'A quale secolo appartiene Alessandro Manzoni?', 'Letteratura Italiana'),
(50, 'Chi scrisse \"Canti\" e \"Operette morali\"?', 'Letteratura Italiana');

-- --------------------------------------------------------

--
-- Struttura della tabella `punteggio`
--

CREATE TABLE `punteggio` (
  `ID_punteggio` int NOT NULL,
  `valore` int NOT NULL,
  `creato_il` datetime NOT NULL,
  `email` varchar(100) NOT NULL,
  `categoria` enum('Storia','Geografia','Scienze','Sport','Letteratura Italiana') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `punteggio`
--

INSERT INTO `punteggio` (`ID_punteggio`, `valore`, `creato_il`, `email`, `categoria`) VALUES
(15, 7, '2025-05-01 23:44:22', 'anto@gmail.com', 'Scienze'),
(16, 8, '2025-05-01 23:59:21', 'anto@gmail.com', 'Storia'),
(17, 8, '2025-05-02 00:34:42', 'riccia1404@gmail.com', 'Geografia'),
(18, 6, '2025-05-02 08:12:25', 'concy@gmail.com', 'Geografia'),
(19, 10, '2025-05-02 10:30:43', 'anto@gmail.com', 'Geografia'),
(20, 7, '2025-05-02 13:23:19', 'anto@gmail.com', 'Sport');

-- --------------------------------------------------------

--
-- Struttura della tabella `risposte`
--

CREATE TABLE `risposte` (
  `id_risposta` int NOT NULL,
  `descrizione` varchar(500) NOT NULL,
  `stato` enum('corretta','sbagliata') NOT NULL,
  `id_domanda` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `risposte`
--

INSERT INTO `risposte` (`id_risposta`, `descrizione`, `stato`, `id_domanda`) VALUES
(63, 'George Washington', 'corretta', 1),
(64, 'Thomas Jefferson', 'sbagliata', 1),
(65, '1989', 'corretta', 2),
(66, '1975', 'sbagliata', 2),
(67, 'Cristoforo Colombo', 'corretta', 3),
(68, 'Marco Polo', 'sbagliata', 3),
(69, 'Vespasiano', 'corretta', 4),
(70, 'Nerone', 'sbagliata', 4),
(71, '1918', 'corretta', 5),
(72, '1945', 'sbagliata', 5),
(73, 'Marx ed Engels', 'corretta', 6),
(74, 'Lenin e Trotsky', 'sbagliata', 6),
(75, 'Egizi', 'corretta', 7),
(76, 'Maya', 'sbagliata', 7),
(77, 'Lenin', 'corretta', 8),
(78, 'Stalin', 'sbagliata', 8),
(79, 'XV', 'corretta', 9),
(80, 'XIII', 'sbagliata', 9),
(81, 'Presa della Bastiglia', 'corretta', 10),
(82, 'Rivoluzione Francese', 'sbagliata', 10),
(83, 'Nilo', 'corretta', 11),
(84, 'Rio delle Amazzoni', 'sbagliata', 11),
(85, 'Algeria', 'corretta', 12),
(86, 'Egitto', 'sbagliata', 12),
(87, 'Ottawa', 'corretta', 13),
(88, 'Toronto', 'sbagliata', 13),
(89, 'Everest', 'corretta', 14),
(90, 'K2', 'sbagliata', 14),
(91, 'Africa', 'corretta', 15),
(92, 'Asia', 'sbagliata', 15),
(93, 'Giappone', 'corretta', 16),
(94, 'Cina', 'sbagliata', 16),
(95, 'Mosca', 'corretta', 17),
(96, 'Kiev', 'sbagliata', 17),
(97, 'Pacifico', 'corretta', 18),
(98, 'Atlantico', 'sbagliata', 18),
(99, 'Australia', 'corretta', 19),
(100, 'Brasile', 'sbagliata', 19),
(101, 'Cina', 'corretta', 20),
(102, 'Russia', 'sbagliata', 20),
(103, 'Ossigeno', 'corretta', 21),
(104, 'Oro', 'sbagliata', 21),
(105, 'Marte', 'corretta', 22),
(106, 'Venere', 'sbagliata', 22),
(107, 'Pancreas', 'corretta', 23),
(108, 'Fegato', 'sbagliata', 23),
(109, 'Anidride carbonica', 'corretta', 24),
(110, 'Azoto', 'sbagliata', 24),
(111, '46', 'corretta', 25),
(112, '23', 'sbagliata', 25),
(113, 'Albert Einstein', 'corretta', 26),
(114, 'Isaac Newton', 'sbagliata', 26),
(115, 'Ampere', 'corretta', 27),
(116, 'Volt', 'sbagliata', 27),
(117, 'Glicolisi', 'corretta', 28),
(118, 'Fotosintesi', 'sbagliata', 28),
(119, 'Idrogeno', 'corretta', 29),
(120, 'Elio', 'sbagliata', 29),
(121, 'Nucleo', 'corretta', 30),
(122, 'Mitocondrio', 'sbagliata', 30),
(123, 'Michael Phelps', 'corretta', 31),
(124, 'Usain Bolt', 'sbagliata', 31),
(125, 'Baseball', 'corretta', 32),
(126, 'Golf', 'sbagliata', 32),
(127, '15', 'corretta', 33),
(128, '11', 'sbagliata', 33),
(129, 'Brasile', 'corretta', 34),
(130, 'Italia', 'sbagliata', 34),
(131, 'Usain Bolt', 'corretta', 35),
(132, 'Lionel Messi', 'sbagliata', 35),
(133, '1960', 'corretta', 36),
(134, '1980', 'sbagliata', 36),
(135, 'Tennis', 'corretta', 37),
(136, 'Calcio', 'sbagliata', 37),
(137, 'Inghilterra', 'corretta', 38),
(138, 'India', 'sbagliata', 38),
(139, '3 o 5', 'corretta', 39),
(140, '2 o 3', 'sbagliata', 39),
(141, 'Londra', 'corretta', 40),
(142, 'Rio de Janeiro', 'sbagliata', 40),
(143, 'Alessandro Manzoni', 'corretta', 41),
(144, 'Italo Calvino', 'sbagliata', 41),
(145, 'Decadentismo', 'corretta', 42),
(146, 'Futurismo', 'sbagliata', 42),
(147, 'Dante Alighieri', 'corretta', 43),
(148, 'Francesco Petrarca', 'sbagliata', 43),
(149, 'Palermo', 'corretta', 44),
(150, 'Roma', 'sbagliata', 44),
(151, 'Italo Svevo', 'corretta', 45),
(152, 'Luigi Pirandello', 'sbagliata', 45),
(153, 'Decameron', 'corretta', 46),
(154, 'Orlando Furioso', 'sbagliata', 46),
(155, 'Niccolò Machiavelli', 'corretta', 47),
(156, 'Dante Alighieri', 'sbagliata', 47),
(157, 'La Storia', 'corretta', 48),
(158, 'Il nome della rosa', 'sbagliata', 48),
(159, 'XIX secolo', 'corretta', 49),
(160, 'XVIII secolo', 'sbagliata', 49),
(161, 'Giacomo Leopardi', 'corretta', 50),
(162, 'Ugo Foscolo', 'sbagliata', 50);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `psw` varchar(200) NOT NULL,
  `ruolo` enum('admin','cliente') NOT NULL,
  `creato_il` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`nome`, `cognome`, `email`, `psw`, `ruolo`, `creato_il`) VALUES
('Admin', 'System', 'Admin@gmail.com', 'scrypt:32768:8:1$o6lSKwz5nF86A5Ix$6bf66f76cef17eb469b8743823c6446d8226b0f75f62006acbdb626b99c1bdf810e1e0838d967f945e3071179f927618a94bcdd06dd34bfc6f2ad4c043ce64c6', 'admin', '2025-03-26 18:10:24'),
('Antonio', 'Manniello', 'anto@gmail.com', 'scrypt:32768:8:1$nNAWRzwTE5j6iH1p$b12413adc59487270701196d2bd1f58b22c489912c74b6f2f67fe2ceedbd46d26037ddaa12b4b312e96f235b335d28b6845bf5e5dd8d9a0518e997003c040f5b', 'cliente', '2025-04-29 20:05:41'),
('Concetta', 'Vannella', 'concy@gmail.com', 'scrypt:32768:8:1$fQ3GeQ8GE6I9RK28$0dbb15c01c91d566b72bae4fa0814927a61372d7d8745f015199257008db22c48e7afd9728380615238cce332387e0fd3e0fdab0f0ed4f271f12b7f5f1a8b2a4', 'cliente', '2025-05-02 08:10:08'),
('Alessandro', 'Ricciardelli', 'riccia1404@gmail.com', 'scrypt:32768:8:1$BO78EsBgCBFRBQTs$81af7576ef80ba00ed3cd69506ed119183c17bb96d77c22095294f7b05e835f7a3150e424e8c70968aabaff463035cc6c7aca6fcf4905941391c0fcc2cb226b3', 'cliente', '2025-05-01 23:13:28');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `domande`
--
ALTER TABLE `domande`
  ADD PRIMARY KEY (`id_domanda`);

--
-- Indici per le tabelle `punteggio`
--
ALTER TABLE `punteggio`
  ADD PRIMARY KEY (`ID_punteggio`),
  ADD KEY `email` (`email`);

--
-- Indici per le tabelle `risposte`
--
ALTER TABLE `risposte`
  ADD PRIMARY KEY (`id_risposta`),
  ADD KEY `id_domanda` (`id_domanda`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `domande`
--
ALTER TABLE `domande`
  MODIFY `id_domanda` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT per la tabella `punteggio`
--
ALTER TABLE `punteggio`
  MODIFY `ID_punteggio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT per la tabella `risposte`
--
ALTER TABLE `risposte`
  MODIFY `id_risposta` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `punteggio`
--
ALTER TABLE `punteggio`
  ADD CONSTRAINT `punteggio_ibfk_1` FOREIGN KEY (`email`) REFERENCES `utente` (`email`);

--
-- Limiti per la tabella `risposte`
--
ALTER TABLE `risposte`
  ADD CONSTRAINT `risposte_ibfk_1` FOREIGN KEY (`id_domanda`) REFERENCES `domande` (`id_domanda`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
