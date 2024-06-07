package sg.edu.nus.iss.WorkShop_32.models;

import java.util.*;


public class Todo {
    private String description;
    private Date dueDate;
    private String priority;

    public Todo(){
    }

    public void setDescription(String inputDescription){
        this.description = inputDescription;
    }

    public String getDescription(){
        return this.description;
    }

    public void setDueDate(Date inputDate){
        this.dueDate = inputDate;
    }

    public Date getDueDate(){
        return this.dueDate;
    }

    public void setPriority(String inputPriority){
        this.priority = inputPriority;
    }

    public String getPriority(){
        return this.priority;
    }


}
