package sg.edu.nus.iss.WorkShop_32.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageData{
    private String pic_id;
    private byte[] contents;
    private String mediaType;
}
