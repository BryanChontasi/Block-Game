
        <?php
  
  
  if(isset($_POST["contactName"]) && !empty($_POST["contactName"]) &&
	 isset($_POST["contactSurname"]) && !empty($_POST["contactSurname"]) &&
	 isset($_POST["contactEmail"]) && !empty($_POST["contactEmail"]) &&
	 isset($_POST["message"]) && !empty($_POST["message"])){
		 
		 $name = $_POST["contactName"]. " ". $_POST["contactSurname"]; // name and surname
		 $mail = $_POST["contactEmail"];
		 $message = $_POST["message"];
		 
		 echo "The message has been send";
		 
	  
	  
  }
       ?>
	   