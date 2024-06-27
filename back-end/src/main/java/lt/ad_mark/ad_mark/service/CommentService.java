package lt.ad_mark.ad_mark.service;

import lt.ad_mark.ad_mark.repository.CommentRepository;
import lt.ad_mark.ad_mark.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public Comment saveComment(Comment comment) {
        comment.setCreatedAt(LocalDateTime.now()); // Initialize createdAt field
        return commentRepository.save(comment);
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
