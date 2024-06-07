package sg.edu.nus.iss.WorkShop_32.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "todo_login")
@Data
@NoArgsConstructor
public class User {
    @Id
    private String id;
    private String name;
    private String username;
    private String hashedPassword;
    private byte[] salt;
    @Field("todo-list")
    private Todo[] todoList;
}
