package lt.bookbyte.book_byte.repository;

import lt.bookbyte.book_byte.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);
}
