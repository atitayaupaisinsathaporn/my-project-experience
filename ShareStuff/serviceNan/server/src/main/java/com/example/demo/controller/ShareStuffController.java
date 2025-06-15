package com.example.demo.controller;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // อนุญาต frontend เชื่อมต่อ
public class ShareStuffController {

    @Autowired
    private ItemRepository itemRepo;

    // ค้นหาของ: GET /api/items?name=...
    @GetMapping("/items")
    public List<Item> search(@RequestParam(required = false, defaultValue = "") String name) {
        return itemRepo.findByNameContainingIgnoreCase(name);
    }

    // ยืมของ: POST /api/borrow?itemId=1
    @PostMapping("/borrow")
    public ResponseEntity<String> borrowItem(@RequestParam Long itemId) {
        Item item = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (item.getQuantity() <= 0) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Item is out of stock");
        }

        item.setQuantity(item.getQuantity() - 1);
        itemRepo.save(item);

        return ResponseEntity.ok("Borrowed successfully");
    }
}
