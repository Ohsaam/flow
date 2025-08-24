package com.flow.flow.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class FileExtensionController {
    


    @GetMapping("")
    public String fileExtensionBlockPage() {

        return "file-extension-block";
    }
} 