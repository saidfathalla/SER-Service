<?php
  header('X-XSS-Protection:0');  
		function queryDBpediaCountry($countryString) {
	
	// echo $_SERVER['DOCUMENT_ROOT'];
            $querystring = "";
			
		
		
		define("RDFAPI_INCLUDE_DIR", $_SERVER['DOCUMENT_ROOT']."SPARQL-AG/api/");
		
	//	echo " </br>" .RDFAPI_INCLUDE_DIR . "sparql/SparqlEngine.php  ";
	//	echo " </br>" .RDFAPI_INCLUDE_DIR . "RdfAPI.php  " ;
        include(RDFAPI_INCLUDE_DIR . "RdfAPI.php");
        include (RDFAPI_INCLUDE_DIR . "sparql/SparqlEngine.php");
		
		
		
		
		
		echo '<script language="javascript">';
echo 'alert("message successfully sent")';
echo '</script>';
// Create a SPARQL client  
            $client = ModelFactory::getSparqlClient("https://dbpedia.org/sparql");
            $query = new ClientQuery();
            $querystring = '
            PREFIX dbpedia-owl: <http://dbpedia.org/ontology/>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            SELECT ?country  
            WHERE { 
              ?country rdf:type dbpedia-owl:Country .
              ?country rdfs:label "' . $countryString . '"@en.
            }
		';
            $query = new ClientQuery();
            $query->query($querystring);
            $result = $client->query($query);
		
            if (!isset($result[0])) 
                return "null";
             else 
                return $result[0]['?country']->getLabel();
            }
		
		?>