package sg.edu.nus.iss.WorkShop_32.constants;

public class Constants {
    public static final String SQL_INSERT_PICTURE = """
                                                    insert into pictures (username,pic_id,content,image_type)
                                                    values (?,?,?,?)
                                                    """;
}
