package lt.ad_mark.ad_mark.dto;

public class CardDTO {
    private Long id;
    private String title;
    private String description;
    private String isbn;
    private String imageUrl;
    private int pageCount;
    private double price;   // naujas laukas
    private String city;    // naujas laukas
    private Long categoryId; // Kategorijos ID
    private String categoryName; // Kategorijos pavadinimas

    public CardDTO() {
    }

    public CardDTO(Long id, String title, String description, String isbn, String imageUrl, int pageCount, double price, String city, Long categoryId, String categoryName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isbn = isbn;
        this.imageUrl = imageUrl;
        this.pageCount = pageCount;
        this.price = price;
        this.city = city;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Override
    public String toString() {
        return "CardDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", isbn='" + isbn + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", pageCount=" + pageCount +
                ", price=" + price +
                ", city='" + city + '\'' +
                ", categoryId=" + categoryId +
                ", categoryName='" + categoryName + '\'' +
                '}';
    }
}
