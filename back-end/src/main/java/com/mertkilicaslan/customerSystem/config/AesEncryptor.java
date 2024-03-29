package com.mertkilicaslan.customerSystem.config;

import lombok.SneakyThrows;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.SerializationUtils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.util.Base64;

@Configuration
public class AesEncryptor implements AttributeConverter<Object, String> {

    private static final String ENCRYPTION_KEY = "this-is-test-key"; // 16 chars - 32 bytes
    private static final String ENCRYPTION_CIPHER = "AES";

    private Key key; // Encryption key string
    private Cipher cipher; // Encryption cipher string

    private Key getKey() {
        if (key == null) {
            key = new SecretKeySpec(AesEncryptor.ENCRYPTION_KEY.getBytes(), AesEncryptor.ENCRYPTION_CIPHER);
        }
        return key;
    }

    private Cipher getCipher() throws GeneralSecurityException {
        if (cipher == null) {
            cipher = Cipher.getInstance(AesEncryptor.ENCRYPTION_CIPHER);
        }
        return cipher;
    }

    private void initCipher(int encryptMode) throws GeneralSecurityException {
        getCipher().init(encryptMode, getKey());
    }

    // Convert plain text object into encrypted text (Encryption)
    @SneakyThrows
    @Override
    public String convertToDatabaseColumn(Object attribute) {
        if (attribute == null) {
            return null;
        }
        initCipher(Cipher.ENCRYPT_MODE);
        byte[] bytes = SerializationUtils.serialize(attribute);
        return Base64.getEncoder().encodeToString((getCipher()).doFinal(bytes));
    }

    // Convert encrypted text value into plain text object (Decryption)
    @SneakyThrows
    @Override
    public Object convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        initCipher(Cipher.DECRYPT_MODE);
        byte[] bytes = getCipher().doFinal(Base64.getDecoder().decode(dbData));
        return SerializationUtils.deserialize(bytes);
    }
}
