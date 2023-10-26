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

// LoadBookmarks gets data from bookmarks.json and return an array of maps
func (a *App) LoadBookmarks() interface{} {
	// Open only for reading
	file, err := os.Open("./bookmarks.json")
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

	jsn := []map[string]interface{}{}

	json.Unmarshal(data, &jsn)
	
	var result []interface{}

	for _, i := range jsn {
		result = append(result, i)
	}

	return result
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

	jsn := []map[string]interface{}{}

	json.Unmarshal(data, &jsn)

	jsn = append(jsn, map[string]interface{}{
		"name": name,
		"link": link,
		"icon": icon,
	})

	res, err := json.Marshal(jsn)
	if err != nil {
		fmt.Println(err)
	}

	err = file.Truncate(0)
	if err != nil {
		panic(err)
	}

	file.WriteAt([]byte(res), 0)

	file.Close()
}
