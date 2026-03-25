import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "password123";
        String hashedPassword = encoder.encode(password);
        System.out.println("Hash para 'password123': " + hashedPassword);
        
        // Verificar que funciona
        boolean matches = encoder.matches(password, hashedPassword);
        System.out.println("Verificación: " + matches);
    }
}
