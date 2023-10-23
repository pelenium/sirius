package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) SaveToJSON(name, link, icon string) {
	var file *os.File

	file, err := os.OpenFile("./bookmarks.json", os.O_RDWR, 0644)
	if errors.Is(err, os.ErrNotExist) {
		file, err = os.Create("./bookmarks.json")
		if err != nil {
			fmt.Println(err)
		}
		file.WriteAt([]byte("{}"), 0)
	}

	data, err := io.ReadAll(file)
	if err != nil {
		fmt.Println(err)
	}
	
	jsn := map[string]interface{}{}
	
	json.Unmarshal(data, &jsn)
	
	jsn[link] = map[string]interface{}{
		"link": link,
		"icon": icon,
	}
	
	res, err := json.Marshal(jsn)
	if err != nil {
		fmt.Println(err)
	}
	
	file.WriteAt([]byte(res), 0)
	
	fmt.Println(jsn)

	file.Close()
}
