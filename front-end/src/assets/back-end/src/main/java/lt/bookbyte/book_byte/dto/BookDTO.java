package lt.bookbyte.book_byte.dto;

import lt.bookbyte.book_byte.entity.Category;

public class BookDTO {
    private Long id;
    private String title;
    private String description;
    private String isbn;
    private String imageUrl;
    private int pageCount;
    private Long categoryId; // Kategorijos ID

    // Gauti ir nustatyti metodai

    public BookDTO() {
    }

    public BookDTO(Long id, String title, String description, String isbn, String imageUrl, int pageCount, Long categoryId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isbn = isbn;
        this.imageUrl = imageUrl;
        this.pageCount = pageCount;
        this.categoryId = categoryId;
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

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    // Papildomi metodai, jei reikia
}
