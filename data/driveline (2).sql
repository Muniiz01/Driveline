-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/05/2024 às 10:21
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `driveline`
--
CREATE DATABASE IF NOT EXISTS `driveline` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `driveline`;

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SelecionarDadosDuasTabelas` (IN `email1` VARCHAR(100))  NO SQL BEGIN
    
    SELECT id_usuario, email, senha, idNivel_de_Acesso
    FROM usuarios WHERE email = email1
    UNION
    SELECT id_usuario, email, senha, idNivel_de_Acesso
    FROM funcionarios WHERE email = email1
    ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `selectAll` (IN `id_user` INT, IN `id_nivel` INT)   BEGIN
    
    SELECT *
    FROM usuarios WHERE id_usuario = id_user AND idNivel_de_Acesso = id_nivel
    UNION
    SELECT *
    FROM funcionarios WHERE id_usuario = id_user AND idNivel_de_Acesso = id_nivel
    ;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `tipo_doc` varchar(50) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `senha` varchar(250) DEFAULT NULL,
  `documento` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `idNivel_de_Acesso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `funcionarios`
--

INSERT INTO `funcionarios` (`tipo_doc`, `nome`, `telefone`, `senha`, `documento`, `email`, `id_usuario`, `idNivel_de_Acesso`) VALUES
('RG', 'victor', '123', '$2y$10$EGzaWomUKme392e/Jgh3reuCF1O4ByZ5WKgi0gso63vU17A0xwZKK', '123', 'adm@adm', 2, 3),
('RG', 'Victor Muniz', '123123132', '$2y$10$3EWwFSYr2yZk77YGp.NjJunNNi2hWvsI.1IZA0Zyb9AGTw.PiOSHO', '123', 'victormuniz281@outlook.com', 3, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `historico`
--

CREATE TABLE `historico` (
  `data_registro` date DEFAULT NULL,
  `idVeiculos` int(11) DEFAULT NULL,
  `idUsuarios` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `img_funcionario`
--

CREATE TABLE `img_funcionario` (
  `idImg_funcionario` int(11) NOT NULL,
  `caminho_imagem` varchar(50) DEFAULT NULL,
  `id_funcionario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `img_veiculo`
--

CREATE TABLE `img_veiculo` (
  `caminho_imagem` varchar(100) DEFAULT NULL,
  `id_imagem_veiculo` int(11) NOT NULL,
  `idVeiculos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `img_veiculo`
--

INSERT INTO `img_veiculo` (`caminho_imagem`, `id_imagem_veiculo`, `idVeiculos`) VALUES
('imagem_carros/cross0.WEBP', 3, 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `nivel_de_acesso`
--

CREATE TABLE `nivel_de_acesso` (
  `id_nivelacesso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `nivel_de_acesso`
--

INSERT INTO `nivel_de_acesso` (`id_nivelacesso`) VALUES
(1),
(2),
(3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `senha` varchar(250) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(50) DEFAULT NULL,
  `documento` varchar(50) DEFAULT NULL,
  `tipo_doc` varchar(50) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `idNivel_de_Acesso` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `senha`, `email`, `telefone`, `documento`, `tipo_doc`, `nome`, `idNivel_de_Acesso`) VALUES
(3, '$2y$10$DL6Vatzjt8jhQc3hrO04e.3CHdRI0iNlhpDvrbqWHN7MTirBgM/iO', 'adm', '12313123', '123123123', 'RG', 'Victor Muniz', 1),
(5, '$2y$10$aSab5p.jh6UR2wG9TH1fouUWqvbY9PVT7hRo4XAqDbl23UBFOVrWq', 'root', '47997895697', '123', 'RG', 'Victor Muniz', 1),
(6, '$2y$10$HIMhVkvoo/Ne6xHYQgD7b.534/mj8GlG9Y74n8IirgHFykur/HYr6', 'teste@teste', '123', '123', 'RG', 'tese', 1),
(12, '$2y$10$Iqtozts3LQl4tljqQWUvGuLHpygFf/1oSZWUasvS38W0dckVL88um', 'victormuniz281@outlook.com', '47997895697', '123', 'RG', 'Victor Muniz', 2),
(13, '$2y$10$I30OPxbwPdGTgx2rFHngq.B/y4EmJcAZPcHESjaRmltTnaSYeIWMq', 'teste@teste1', '123', '123', 'RG', 'Victor Muniz', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `veiculos`
--

CREATE TABLE `veiculos` (
  `marca` varchar(100) DEFAULT NULL,
  `cor` varchar(50) DEFAULT NULL,
  `quilometragem` varchar(50) DEFAULT NULL,
  `cambio` varchar(50) DEFAULT NULL,
  `passageiros` varchar(50) DEFAULT NULL,
  `ar_condicionado` varchar(50) DEFAULT NULL,
  `id_veiculos` int(11) NOT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `abs` varchar(50) DEFAULT NULL,
  `volume_carga` varchar(50) DEFAULT NULL,
  `airbag` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `veiculos`
--

INSERT INTO `veiculos` (`marca`, `cor`, `quilometragem`, `cambio`, `passageiros`, `ar_condicionado`, `id_veiculos`, `descricao`, `abs`, `volume_carga`, `airbag`, `modelo`, `categoria`) VALUES
('toyota', '', '', '', '', '', 3, '', '', '', '', 'cross', 'SUV');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `idNivel_de_Acesso` (`idNivel_de_Acesso`);

--
-- Índices de tabela `historico`
--
ALTER TABLE `historico`
  ADD KEY `idVeiculos` (`idVeiculos`),
  ADD KEY `idUsuarios` (`idUsuarios`);

--
-- Índices de tabela `img_funcionario`
--
ALTER TABLE `img_funcionario`
  ADD PRIMARY KEY (`idImg_funcionario`);

--
-- Índices de tabela `img_veiculo`
--
ALTER TABLE `img_veiculo`
  ADD PRIMARY KEY (`id_imagem_veiculo`),
  ADD KEY `idVeiculos` (`idVeiculos`);

--
-- Índices de tabela `nivel_de_acesso`
--
ALTER TABLE `nivel_de_acesso`
  ADD PRIMARY KEY (`id_nivelacesso`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `idNivel_de_Acesso` (`idNivel_de_Acesso`);

--
-- Índices de tabela `veiculos`
--
ALTER TABLE `veiculos`
  ADD PRIMARY KEY (`id_veiculos`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `img_funcionario`
--
ALTER TABLE `img_funcionario`
  MODIFY `idImg_funcionario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `img_veiculo`
--
ALTER TABLE `img_veiculo`
  MODIFY `id_imagem_veiculo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `nivel_de_acesso`
--
ALTER TABLE `nivel_de_acesso`
  MODIFY `id_nivelacesso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `veiculos`
--
ALTER TABLE `veiculos`
  MODIFY `id_veiculos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`idNivel_de_Acesso`) REFERENCES `nivel_de_acesso` (`id_nivelacesso`);

--
-- Restrições para tabelas `historico`
--
ALTER TABLE `historico`
  ADD CONSTRAINT `historico_ibfk_1` FOREIGN KEY (`idVeiculos`) REFERENCES `veiculos` (`id_veiculos`),
  ADD CONSTRAINT `historico_ibfk_2` FOREIGN KEY (`idUsuarios`) REFERENCES `usuarios` (`id_usuario`);

--
-- Restrições para tabelas `img_veiculo`
--
ALTER TABLE `img_veiculo`
  ADD CONSTRAINT `img_veiculo_ibfk_1` FOREIGN KEY (`idVeiculos`) REFERENCES `veiculos` (`id_veiculos`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idNivel_de_Acesso`) REFERENCES `nivel_de_acesso` (`id_nivelacesso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
