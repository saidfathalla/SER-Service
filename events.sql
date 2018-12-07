-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 07, 2018 at 03:19 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `serdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `acronym` varchar(29) DEFAULT NULL,
  `title` varchar(207) DEFAULT NULL,
  `field` varchar(50) DEFAULT NULL,
  `H5` int(3) DEFAULT NULL,
  `AVGAR` varchar(10) DEFAULT NULL,
  `UMonth` varchar(10) DEFAULT NULL,
  `Since` int(4) DEFAULT NULL,
  `Publisher` varchar(50) DEFAULT NULL,
  `Type` varchar(20) DEFAULT NULL,
  `SER` varchar(5) DEFAULT NULL,
  `webpage` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`acronym`, `title`, `field`, `H5`, `AVGAR`, `UMonth`, `Since`, `Publisher`, `Type`, `SER`, `webpage`) VALUES
('CVPR', 'IEEE Conference on Computer Vision and Pattern Recognition', 'Artificial Intellligence', 158, '0.33', 'Jun', 1985, 'IEEE', 'Conference', 'A+', 'cvpr2018.thecvf.com/'),
('NIPS', 'Advances in Neural Information Processing Systems', 'Artificial Intellligence', 101, '0.25', 'Dec', 1987, 'NIPS', 'Conference', 'A+', 'nips.cc/'),
('ICCV', 'International Conference on Computer Vision', 'Artificial Intellligence', 89, '0.26', 'Oct', 1987, 'IEEE', 'Conference', 'A+', 'iccv2017.thecvf.com/'),
('IJCAI', 'International Joint Conference on Artificial Intelligence', 'Artificial Intellligence', 45, '0.26', 'Aug', 1969, 'AAArtificial Intellligence', 'Conference', 'A+', 'www.ijcai-18.org/'),
('AAAI', 'Annual National Conference on Artificial Intelligence', 'Artificial Intellligence', 56, '0.26', 'Jul', 1980, 'AAArtificial Intellligence', 'Conference', 'A+', 'aaai.org/Conferences/AAAI-18/'),
('ECCV', 'European Conference on Computer Vision', 'Artificial Intellligence', 98, '0.31', 'May', 1990, 'Springer', 'Conference', 'A+', 'https://eccv2018.org/'),
('ACCV', 'Asian Conference on Computer Vision', 'Artificial Intellligence', 35, '0.28', 'Jan', 1995, 'Springer', 'Conference', 'B+', 'http://accv2018.net/'),
('AAMAS', 'International Conference on Autonomous Agents and Multiagent Systems', 'Artificial Intellligence', 40, '0.23', 'May', 2002, 'Springer', 'Conference', 'A+', 'http://celweb.vuse.vanderbilt.edu/aamas18/'),
('UIST', 'ACM Symposium on USer Interface Software and Technology', 'Artificial Intellligence', 44, '0.21', 'Oct', 1988, 'IEEE', 'Symposium', 'A+', 'uist.acm.org/uist2018/'),
('FOGA', 'ACM/SIGEVO Conference on Foundations of Genetic Algorithms', 'Artificial Intellligence', 9, '0.59', 'Jan', 1990, 'ACM', 'Workshop', 'A', 'foga-2017.sigevo.org/'),
('ECAI', 'European Conference on Artificial Intelligence', 'Artificial Intellligence', 29, '0.27', 'Aug', 1982, 'IOS', 'Conference', 'A+', 'www.ijcai-18.org/'),
('AISTATS', 'International Conference on Artificial Intelligence and Statistics', 'Artificial Intellligence', 31, '0.35', 'Jan', 1985, 'PMLR', 'Workshop', 'A', 'www.aistats.org/'),
('UAI', 'The Conference on UncertArtificial Intellligencenty in Artificial Intelligence', 'Artificial Intellligence', 32, '0.33', 'Jul', 1985, 'IEEE', 'Conference', 'A+', 'auai.org/uai2018/'),
('ICONIP', 'International Conference on Neural Information Processing', 'Artificial Intellligence', 17, '0.54', 'Jan', 1997, 'Springer', 'Conference', 'A', 'conference.cs.cityu.edu.hk/iconip/'),
('EUROGP', 'European Conference on Genetic Programming,', 'Artificial Intellligence', 14, '0.36', 'Apr', 1998, 'IOS', 'Conference', 'A', 'www.evostar.org/2018/cfp_eurogp.php'),
('KR', 'International Conference on Principles of Knowledge Representation and Reasoning', 'Artificial Intellligence', 26, '0.28', 'Apr', 1989, 'AAArtificial Intellligence', 'Conference', 'A+', 'reasoning.eas.asu.edu/kr2018/'),
('ISCA', 'International Symposium on Computer Architecture', 'Computer Systems Organization', 54, '0.18', 'Jun', 1973, 'IEEE', 'Symposium', 'A+', 'iscaconf.org/isca2018/'),
('HPCA', 'High-Performance Computer Architecture', 'Computer Systems Organization', 46, '0.2', 'Feb', 1995, 'ACM', 'Conference', 'A+', 'hpca2018.ece.ucsb.edu/'),
('FOCS', 'Annual Symposium on Foundations of Computer Science', 'Computer Systems Organization', 45, '0.28', 'Oct', 1989, 'IEEE', 'Symposium', 'A+', 'ieee-focs.org/'),
('PERCOM', 'International Conference on Pervasive Computing and Communications', 'Computer Systems Organization', 31, '0.15', 'Mar', 2003, 'IEEE', 'Conference', 'A+', 'www.percom.org/'),
('DSN', 'International Conference on Dependable Systems and Networks', 'Computer Systems Organization', 32, '0.23', 'Jun', 2000, 'IEEE', 'Conference', 'A+', 'dsn2018.uni.lu/'),
('SBAC-PAD', 'International Symposium on Computer Architecture and High Performance Computing', 'Computer Systems Organization', 15, '2.13', 'Oct', 1987, 'IEEE', 'Symposium', 'A', 'graal.ens-lyon.fr/sbac-pad/'),
('CSCW', 'ACM Conference on Computer-Supported Cooperative Work and Social Computing', 'Computer Systems Organization', 56, '0.26', 'Nov', 1986, 'ACM', 'Conference', 'A+', 'cscw.acm.org/2018/'),
('EuroSys', 'European Conference on Computer Systems', 'Computer Systems Organization', 41, '0.22', 'Apr', 2006, 'ACM', 'Conference', 'A+', 'eurosys2018.org/'),
('PODC', 'Symposium on Principles of Distributed Computing', 'Computer Systems Organization', 25, '0.3', 'Aug', 1982, 'ACM', 'Symposium', 'A+', 'www.podc.org/podc2018/'),
('ISMAR', 'IEEE / ACM International Symposium on Mixed and Augmented Reality', 'Human Centered Computing', 26, '0.24', 'Oct', 1999, 'IEEE', 'Symposium', 'A+', 'ismar2018.org/'),
('VR', 'IEEE Conference on Virtual Reality and 3D User Interfaces', 'Human Centered Computing', 17, '0.26', 'Mar', 1993, 'IEEE', 'Conference', 'A', 'ieeevr.org/2018/'),
('CHI', 'Conference on Human Factors in Computing Systems', 'Human Centered Computing', 85, '0.24', 'Apr', 1982, 'ACM', 'Conference', 'A+', 'chi2018.acm.org/'),
('MOBICOM', 'Annual International Conference on Mobile Computing and Networking', 'Human Centered Computing', 45, '0.16', 'sep', 1995, 'ACM', 'Conference', 'A+', 'sigmobile.org/mobicom/2018/'),
('Infovis', 'IEEE Symposium on Information Visualization', 'Human Centered Computing', 14, '0.31', 'Oct', 1990, 'IEEE', 'Conference', 'A+', 'ieeevis.org/year/2018/welcome'),
('SIGGRAPH', 'Special Interest Group on Computer Graphics and Interactive Techniques Conference', 'Human Centered Computing', 22, '0.23', 'Jul', 1974, 'ACM', 'Conference', 'A+', 's2018.siggraph.org/'),
('VLDB', 'International Conference on Very Large Databases', 'Information Systems', 73, '0.18', 'Aug', 1985, 'VLDB', 'Conference', 'A+', 'vldb2018.lncc.br/'),
('RecSys', 'Conference on Recommender Systems', 'Information Systems', 34, '0.26', 'Oct', 2007, 'ACM', 'Conference', 'A', 'recsys.acm.org/recsys18/'),
('EDBT', 'International Conference on Extending Database Technology', 'Information Systems', 32, '0.2', 'Mar', 1988, 'OP', 'Conference', 'A+', 'edbticdt2018.at/'),
('PKDD', 'Principles and Practice of Knowledge Discovery in Databases', 'Information Systems', 31, '0.25', 'Sep', 1997, 'ACM', 'Conference', 'A+', 'www.ecmlpkdd2018.org/'),
('PODS', 'ACM SIGMOD-SIGACT-SIGArtificial Intellligence Symposium on Principles of Database Systems', 'Information Systems', 26, '0.24', 'Jun', 1982, 'ACM', 'Symposium', 'A+', 'sigmod2018.org/'),
('SIGIR', 'International ACM SIGIR Conference on Research and Development in Information Retrieval', 'Information Systems', 50, '0.3', 'Aug', 1982, 'ACM', 'Conference', 'A+', 'sigir.org/sigir2018/'),
('SIGMOD', 'International Conference on Management of Data', 'Information Systems', 59, '0.17', 'Jun', 1979, 'ACM', 'Conference', 'A+', 'sigmod2018.org/'),
('ICSE', 'International Conference on Software Engineering', 'Software Engineering', 68, '0.17', 'May', 1975, 'ACM', 'Conference', 'A+', 'www.icse2018.org/'),
('PLDI', 'Conference on Programming Language Design and Implementation', 'Software Engineering', 50, '0.21', 'Jun', 1979, 'ACM', 'Conference', 'A+', 'conf.researchr.org/home/pldi-2018'),
('ASPLOS', 'Architectural Support for Programming Languages and Operating Systems', 'Software Engineering', 50, '0.22', 'Mar', 1982, 'ACM', 'Conference', 'A+', 'www.asplos2018.org/'),
('ICDE', 'International Conference on Data Engineering', 'Software Engineering', 51, '0.2', 'Feb', 1984, 'ACM', 'Conference', 'A+', 'icde2018.org/'),
('POPL', 'ACM SIGPLAN Symposium on Principles of Programming Languages', 'Software Engineering', 46, '0.2', 'Jan', 1973, 'ACM', 'Symposium', 'A+', 'popl18.sigplan.org/'),
('OOPSLA', 'Conference on Object-Oriented Programming Systems, Languages, and Applications', 'Software Engineering', 37, '0.22', 'Oct', 1986, 'ACM', 'Conference', 'A+', '2018.splashcon.org/'),
('OSDI', 'USENIX Symposium on Operating Systems Design and Implementation', 'Software Engineering', 39, '0.16', 'Oct', 1994, 'USENIX', 'Symposium', 'A+', 'www.usenix.org/conference/osdi18'),
('FSE', 'ACM Joint European Software Engineering Conference and Symposium on the Foundations of Software Engineering', 'Software Engineering', 43, '0.18', 'sep', 1993, 'Springer', 'Symposium', 'A+', 'conf.researchr.org/home/fse-2018'),
('ASE', 'IEEE/ACM International Conference on Automated Software Engineering', 'Software Engineering', 31, '0.18', 'Sep', 1991, 'IEEE', 'Conference', 'A', 'www.ase2018.com/'),
('ICFP', 'International Conference on Functional Programming', 'Software Engineering', 27, '0.31', 'sep', 1996, 'ACM', 'Conference', 'A+', 'conf.researchr.org/home/icfp-2018'),
('ECOOP', 'European Conference on Object-Oriented Programming', 'Software Engineering', 24, '0.2', 'jul', 1987, 'ACM', 'Conference', 'A+', '2018.ecoop.org/'),
('FASE', 'Fundamental Approaches to Software Engineering', 'Software Engineering', 23, '0.23', 'mar', 1998, 'ACM', 'Conference', 'A', 'www.etaps.org/2018/fase'),
('CCS', 'Conference on Computer and Communications Security', 'Computer Security', 72, '0.22', 'Oct', 1993, 'ACM', 'Conference', 'A+', 'asiaccs2018.org/'),
('SP', 'IEEE Symposium on Security and Privacy', 'Computer Security', 68, '0.28', 'May', 1980, 'IEEE', 'Symposium', 'A+', 'www.ieee-security.org/TC/SP2018/'),
('USENIX', 'Usenix Security Symposium', 'Computer Security', 61, '0.19', 'Aug', 1990, 'USENIX', 'Conference', 'A+', 'www.usenix.org/conference/usenixsecurity18'),
('NDSS', 'Annual Network and Distributed System Security Symposium', 'Computer Security', 56, '0.2', 'Feb', 1993, 'NDSS', 'Symposium', 'A+', 'www.ndss-symposium.org/ndss2018/'),
('EuroCrypt', 'International Conference on the Theory and Applications of Cryptographic Techniques', 'Computer Security', 33, '0.24', 'May', 1982, 'Springer', 'Conference', 'A+', 'eurocrypt.iacr.org/2018/'),
('Ubicomp', 'ACM International Joint Conference on pervasive and Ubiquitous Computing', 'Computer Security', 50, '0.17', 'Sep', 1999, 'ACM', 'Conference', 'A+', 'ubicomp.org/ubicomp2018/'),
('ACSAC', 'Annual Computer Security Applications Conference', 'Computer Security', 29, '0.24', 'Dec', 1985, 'ACM', 'Conference', 'A+', 'www.wikicfp.com/cfp/servlet/event.showcfp?eventid=74941&copyownerid=50401'),
('CSF', 'IEEE Computer Security Foundations Symposium', 'Computer Security', 23, '0.3', 'Jun', 1988, 'IEEE', 'Symposium', 'A+', 'www.cs.ox.ac.uk/conferences/csf2018/'),
('ESORICS', 'European Symposium on Research in Computer Security', 'Computer Security', 28, '0.22', 'sep', 1992, 'Springer', 'Symposium', 'A+', 'esorics2018.upc.edu/'),
('DCC', 'Data Compression Conference', 'Theory of Computation', 17, '', 'Mar', 1991, 'IEEE', 'Conference', 'A+', 'company-cup.eu/category/dcc-2018'),
('IJCAR', 'International Joint Conference on Automated Reasoning', 'Theory of Computation', 45, '0.41', 'Jul', 2001, 'ACM', 'Conference', 'A+', 'ijcar2018.org/'),
('COLT', 'Conference on Learning Theory', 'Theory of Computation', 33, '0.49', 'Jun', 1988, 'PMLR', 'Conference', 'A+', 'www.learningtheory.org/colt2018/'),
('STOC', 'Annual ACM SIGACT Symposium on Theory of Computing', 'Theory of Computation', 56, '0.35', 'May', 1969, 'ACM', 'Symposium', 'A+', 'acm-stoc.org/stoc2018/'),
('SPAA', 'ACM Symposium on Parallelism in Algorithms and Architectures', 'Theory of Computation', 21, '0.32', 'Jun', 1989, 'ACM', 'Symposium', 'A+', 'spaa.acm.org/2018/'),
('CCC', 'Computational Complexity Conference', 'Theory of Computation', 19, '0.33', 'Jun', 1986, 'ACM', 'Conference', 'A+', 'drops.dagstuhl.de/portals/lipics/index.php?semnr=16071'),
('ISSAC', 'International Symposium on Symbolic and AlgebrArtificial Intellligencec Computation', 'Theory of Computation', 18, '0.47', 'Jul', 1988, 'ACM', 'Conference', 'A+', 'www.issac-conference.org/2018/'),
('TheWeb', 'International Conference on World Wide Web', 'Web Technologies', 77, '0.17', 'May', 1995, 'TheWeb', 'Conference', 'A+', 'www2018.thewebconf.org/'),
('ICWS', 'IEEE International Conference on Web Services', 'Web Technologies', 40, '0.21', 'Jun', 1995, 'IEEE', 'Conference', 'A+', 'conferences.computer.org/icws/2018/'),
('WSDM', 'ACM International Conference on Web Search and Data Mining', 'Web Technologies', 54, '0.18', 'Feb', 2004, 'ACM', 'Conference', 'A+', 'www.wsdm-conference.org/2018/'),
('ESWC', 'European Semantic Web Conference', 'Web Technologies', 40, '0.25', 'May', 2004, 'Springer', 'Conference', 'A+', '2018.eswc-conferences.org/'),
('ISWC', 'International Semantic Web Conference', 'Web Technologies', 26, '0.24', 'Oct', 1997, 'Springer', 'Conference', 'A+', 'iswc2018.semanticweb.org/'),
('ICWE', 'International Conference on Web Engineering', 'Web Technologies', 18, '0.24', 'Jul', 2001, 'IEEE', 'Conference', 'B+', 'icwe2018.webengineering.org/'),
('ICSC', 'IEEE International Conference on Semantic Computing', 'Web Technologies', 15, '0.28', 'Sep', 2007, 'IEEE', 'Conference', 'A', 'semanticcomputing.wixsite.com/icsc2018');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
