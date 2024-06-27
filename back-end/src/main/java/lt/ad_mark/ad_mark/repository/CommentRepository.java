package lt.ad_mark.ad_mark.repository;

import lt.ad_mark.ad_mark.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
