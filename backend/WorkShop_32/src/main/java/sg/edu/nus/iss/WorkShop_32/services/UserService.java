package sg.edu.nus.iss.WorkShop_32.services;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import sg.edu.nus.iss.WorkShop_32.repositories.UserRepository;
import sg.edu.nus.iss.WorkShop_32.models.*;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;

    public void save(UserData userData){
        userRepository.save(userData);
    }

    public boolean credentialsMatch(String username, String password){
        User user  = userRepository.findUser(username).orElse(new User());
        if(!user.getId().isBlank()){
            // String salt = new String(user.getSalt());
            // String passwordWithSalt = salt + password;
            // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            // String hashedPassowrd = encoder.encode(passwordWithSalt);

            System.out.println(">>>Login username: " + username);
            System.out.println(">>>Registered username: " + user.getUsername());
            if(username.equals(user.getUsername())){
                return true;
            } 
        }
        return false;
    }

    public void saveTodoArray(Todo[] todo, String username){
        userRepository.saveTodoArray(todo, username);
    }

    public Todo[] getTodoList(String username){
        User user = userRepository.findUser(username).orElse(new User());
        Todo[] todoList = user.getTodoList();
        return todoList;
    }

    public void saveImageToSQL(ImageData imageData){
        userRepository.saveImageToSQL(imageData);
    }
}
